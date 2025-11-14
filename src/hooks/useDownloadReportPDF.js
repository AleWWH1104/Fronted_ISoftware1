// hooks/useDownloadReportPDF.js
import { useCallback } from 'react';
import jsPDF from 'jspdf';
import { getReportForPDF } from '../services/reports';

// Función para construir la URL completa de la imagen
const buildImageUrl = (relativePath) => {
  // Asegúrate de que relativePath comience con /, si no, añádelo
  const normalizedPath = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;
  // Usar la URL base de archivos estáticos definida en las variables de entorno
  const STATIC_FILES_BASE_URL = import.meta.env.VITE_STATIC_FILES_URL || 'http://localhost:4000'; // Valor por defecto si no está definida
  return `${STATIC_FILES_BASE_URL}${normalizedPath}`;
};

const useDownloadReportPDF = () => {
  const downloadReportPDF = useCallback(async (reporteId) => {
    try {
      // Obtener los datos del reporte desde el backend usando el servicio
      const reportData = await getReportForPDF(reporteId);

      // Crear el PDF
      const doc = new jsPDF();
      let yPos = 20;
      const pageHeight = doc.internal.pageSize.height;
      const margin = 10;

      // Título del PDF
      doc.setFontSize(18);
      doc.text('Reporte de Avance de Proyecto', margin, yPos);
      yPos += 10;

      // Información del Proyecto
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text('Proyecto:', margin, yPos);
      doc.setFont(undefined, 'normal');
      yPos += 7;
      doc.text(`Nombre: ${reportData.proyecto.nombre}`, margin + 5, yPos);
      yPos += 7;
      doc.text(`Estado: ${reportData.proyecto.estado}`, margin + 5, yPos);
      yPos += 7;
      doc.text(`Presupuesto: Q${reportData.proyecto.presupuesto}`, margin + 5, yPos);
      yPos += 7;
      doc.text(`Ubicación: ${reportData.proyecto.ubicacion}`, margin + 5, yPos);
      yPos += 7;
      doc.text(`Tipo de Servicio: ${reportData.proyecto.tipo_servicio}`, margin + 5, yPos);
      yPos += 10;

      // Información del Cliente
      doc.setFont(undefined, 'bold');
      doc.text('Cliente:', margin, yPos);
      doc.setFont(undefined, 'normal');
      yPos += 7;
      doc.text(`Nombre: ${reportData.cliente.nombre}`, margin + 5, yPos);
      yPos += 7;
      doc.text(`Teléfono: ${reportData.cliente.telefono}`, margin + 5, yPos);
      yPos += 10;

      // Información del Reporte
      doc.setFont(undefined, 'bold');
      doc.text('Reporte:', margin, yPos);
      doc.setFont(undefined, 'normal');
      yPos += 7;
      doc.text(`Fecha de Creación: ${new Date(reportData.reporte.fecha_creacion).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}`, margin + 5, yPos);
      yPos += 7;
      doc.text(`Avance: ${reportData.reporte.avance}%`, margin + 5, yPos);
      yPos += 7;

      // Actividades Completadas
      doc.setFont(undefined, 'bold');
      doc.text('Actividades Completadas:', margin + 5, yPos);
      doc.setFont(undefined, 'normal');
      yPos += 7;
      const actividadesLines = doc.splitTextToSize(reportData.reporte.actividades, 180);
      doc.text(actividadesLines, margin + 10, yPos);
      yPos += (actividadesLines.length * 7) + 3;

      // Problemas u Observaciones
      doc.setFont(undefined, 'bold');
      doc.text('Problemas u Observaciones:', margin + 5, yPos);
      doc.setFont(undefined, 'normal');
      yPos += 7;
      const problemasLines = doc.splitTextToSize(reportData.reporte.problemas_obs, 180);
      doc.text(problemasLines, margin + 10, yPos);
      yPos += (problemasLines.length * 7) + 3;

      // Próximos Pasos
      doc.setFont(undefined, 'bold');
      doc.text('Próximos Pasos:', margin + 5, yPos);
      doc.setFont(undefined, 'normal');
      yPos += 7;
      const proximosLines = doc.splitTextToSize(reportData.reporte.proximos_pasos, 180);
      doc.text(proximosLines, margin + 10, yPos);
      yPos += (proximosLines.length * 7) + 3;

      // Responsable
      doc.setFont(undefined, 'bold');
      doc.text('Responsable:', margin, yPos);
      doc.setFont(undefined, 'normal');
      yPos += 7;
      doc.text(`Nombre: ${reportData.responsable.nombre}`, margin + 5, yPos);
      yPos += 7;
      doc.text(`Email: ${reportData.responsable.email}`, margin + 5, yPos);

      // Añadir imágenes si existen
      if (reportData.fotos && reportData.fotos.length > 0) {
          yPos += 10;
          doc.setFont(undefined, 'bold');
          doc.text('Fotos del Avance:', margin, yPos);
          doc.setFont(undefined, 'normal');
          yPos += 7;

          for (const foto of reportData.fotos) {
              if (yPos > pageHeight - 50) {
                  doc.addPage();
                  yPos = 20;
              }

              try {
                  // Construir la URL absoluta de la imagen
                  const imageUrl = buildImageUrl(foto.ruta_foto);
                  console.log('Cargando imagen desde URL:', imageUrl); // Para depurar

                  const imgRes = await new Promise((resolve, reject) => {
                      const img = new Image();
                      img.onload = () => resolve(img);
                      img.onerror = (e) => {
                          console.error('Error de carga de imagen:', e);
                          reject(e);
                      };
                      // Usar la URL absoluta
                      img.src = imageUrl;
                  });

                  const maxWidth = 100;
                  const maxHeight = 60;
                  let { width, height } = img;

                  if (width > maxWidth) {
                      height = (height * maxWidth) / width;
                      width = maxWidth;
                  }
                  if (height > maxHeight) {
                      width = (width * maxHeight) / height;
                      height = maxHeight;
                  }

                  doc.addImage(img, 'JPEG', margin + 5, yPos, width, height);
                  yPos += height + 5;
              } catch (imgError) {
                  console.error('Error cargando imagen para PDF:', foto.ruta_foto, imgError);
                  doc.text(`[Imagen no disponible: ${foto.ruta_foto}]`, margin + 5, yPos);
                  yPos += 7;
              }
          }
      }

      // Guardar el PDF
      doc.save(`Reporte_${reportData.proyecto.nombre}_${new Date(reportData.reporte.fecha_creacion).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}.pdf`);
      console.log('PDF generado exitosamente');
    } catch (error) {
      console.error('Error generando PDF:', error);
      // Manejar errores de axios (proviene del servicio)
      if (error.response) {
        console.error('Error de respuesta:', error.response.data, error.response.status);
        alert(`Error del servidor al generar el PDF: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        console.error('Error de red:', error.request);
        alert('Error de red: No se pudo conectar con el servidor para obtener los datos del reporte.');
      } else {
        console.error('Error:', error.message);
        alert('Error al generar el PDF del reporte.');
      }
    }
  }, []); // useCallback con dependencias vacías

  return { downloadReportPDF };
};

export default useDownloadReportPDF;
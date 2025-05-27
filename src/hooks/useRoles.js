import { useEffect, useState } from 'react';
import { getRoles } from "../services/roles";

export default function useRoles() {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getRoles()
          .then(setRoles)
          .catch(setError)
          .finally(() => setLoading(false));
    }, []);

    return {roles}
}


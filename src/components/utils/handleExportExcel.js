export const handleExportExcel = (url, id, axiosClient, setLoading) => {
    if (setLoading !== undefined) {
        setLoading(true);
    }
    axiosClient.post(url, {
        id:id,
    },
    {
        responseType: 'blob',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        const disposition = response.request.getResponseHeader('Content-Disposition');
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(disposition);
        const filename = matches && matches.length > 1 ? matches[1].replace(/['"]/g, '') : 'archivo.xlsx'; // Default filename
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename); // File name
        document.body.appendChild(link);
        link.click();
        if (setLoading !== undefined) {
            setLoading(false);
        }
    })
}
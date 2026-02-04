const InmateDocuments = ({ documents = [] }) => {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
      <h3 className="font-semibold mb-4">Documents</h3>

      {documents.length === 0 ? (
        <p className="text-sm text-neutral-500">No documents uploaded</p>
      ) : (
        <ul className="space-y-3">
          {documents.map((doc, i) => (
            <li key={i} className="flex justify-between items-center">
              <span className="text-sm">{doc.name}</span>
              <a
                href={doc.url}
                target="_blank"
                className="text-indigo-400 text-sm"
              >
                View
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InmateDocuments;

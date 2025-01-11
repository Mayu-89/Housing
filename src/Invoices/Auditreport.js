import React, { useState, useRef } from 'react';
import ReactPaginate from 'react-paginate';
import { useReactToPrint } from 'react-to-print';
import Form1 from './Form1';

// Import other forms as needed

const AuditReportForm = () => {
  const [pageNumber, setPageNumber] = useState(0);

  const forms = [
    <Form1 />,
    
    // Add other forms here
  ];

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const reportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => reportRef.current,
  });

  return (
    <div ref={reportRef}>
      <div>
        {forms[pageNumber]}
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={forms.length}
        onPageChange={changePage}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
      <button onClick={handlePrint}>Print Report</button>
    </div>
  );
};

export default AuditReportForm;

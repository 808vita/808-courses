import { RootState } from "@/redux/store";
import { useReduxMethods } from "@/redux/useReduxMethods/useReduxMethods";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const AccordianSyllabusComponent = ({ syllabusItem }: any) => {
  // const[showAccordion,setShowAccordion]=useState("collapse")

  // this needs showAccordion1 ,...2. ..

  const { setState } = useReduxMethods();

  const setShowAccordion = (prop: any) =>
    setState({
      stateName: `showAccordion${syllabusItem?.week}`,
      stateData: prop,
    });

  const pageState = useSelector((state: RootState) => state?.pageUseState);

  const showAccordion = pageState?.[`showAccordion${syllabusItem?.week}`];

  return (
    <>
      <div className="accordion">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              onClick={() =>
                setShowAccordion(
                  showAccordion === "collapse" ? "show" : "collapse"
                )
              }
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              {`Syllabus Week${syllabusItem?.week}`}
            </button>
          </h2>
          <div
            className={`accordion-collapse ${showAccordion}`}
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <strong>Topic:</strong> <p>{syllabusItem?.topic}</p>
              <strong>Content:</strong> <p>{syllabusItem?.content}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccordianSyllabusComponent;

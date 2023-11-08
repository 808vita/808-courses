
import React from "react";
import { Oval } from "react-loader-spinner";

const Loader = () => {


    return (
        <div className="d-flex align-items-center justify-content-center p-5">


            <Oval
                height={100}
                width={100}
                color="#bb60f0af"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#c291dfaf"
                strokeWidth={6}
                strokeWidthSecondary={4}
            />
        </div>
    );
};

export default Loader;
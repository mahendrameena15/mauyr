// import React from 'react'

// function ContactForm() {
//     return (
//         <>
//             <div className="flex justify-between mx-auto lg:w-3/5 w-full pb-10 relative	px-4">

//                 <div className="details-box  flex flex-col gap-2	 items-center justify-center">
//                     <div className="box-1 flex justify-center items-center bg-custom-skyBlue w-5	h-5 rounded-full	">
//                         <p className="text-white font-normal text-xs">1</p>
//                     </div>
//                     <h5 className="text-base	text-center text-green font-medium	">
//                     Customer details
//                     </h5>
//                 </div>
//                 <div className="line-1 absolute"></div>
//                 <div className="contact-box flex flex-col gap-2 items-center justify-center">
//                     <div className="box-2 flex justify-center items-center bg-custom-skyBlue w-5	h-5 rounded-full	">
//                         <p className="text-white font-normal text-xs">2</p>
//                     </div>
//                     <h5 className="text-base	text-center text-green font-medium	">
//                     Customer details
//                     </h5>
//                 </div>
//                 <div className="line-2 absolute"></div>
//                 <div className="address-box  flex flex-col gap-2 items-center justify-center   ">
//                     <div className="box-3 flex justify-center items-center bg-custom-skyBlue w-5	h-5 rounded-full	">
//                         <p className="text-white font-normal text-xs">3</p>
//                     </div>
//                     <h5 className="text-base	text-center text-green font-medium	">
//                     Customer details
//                     </h5>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default ContactForm

import React from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";

export function ContactForm() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [isLastStep, setIsLastStep] = React.useState(false);
    const [isFirstStep, setIsFirstStep] = React.useState(false);

    const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

    return (
        <div className="w-full py-4 px-8">
            <Stepper
                activeStep={activeStep}
                isLastStep={(value) => setIsLastStep(value)}
                isFirstStep={(value) => setIsFirstStep(value)}
            >
                <Step onClick={() => setActiveStep(0)}>1</Step>
                <Step onClick={() => setActiveStep(1)}>2</Step>
                <Step onClick={() => setActiveStep(2)}>3</Step>
            </Stepper>
            <div className="mt-16 flex justify-between">
                <Button onClick={handlePrev} disabled={isFirstStep}>
                    Prev
                </Button>
                <Button onClick={handleNext} disabled={isLastStep}>
                    Next
                </Button>
            </div>
        </div>
    );
}
export default ContactForm

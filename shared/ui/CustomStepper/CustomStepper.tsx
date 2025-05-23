"use client";
import { useEffect, useState } from "react";
import s from "./CustomStepper.module.scss";
import { useTranslation } from "react-i18next";

interface IStep { 
    title: string,
    component: any,
    active?: boolean,
    props?: Record<string, any>
};
interface ICustomStepperProps {
    steps: IStep[],
    center?: boolean
};

export default function CustomStepper({ steps, center }: ICustomStepperProps) {

    const [activeStep, setActiveStep] = useState<IStep>(steps[0]);
    const { component: CustomComponent } = activeStep;
    const { props: CustomComponentProps } = activeStep;
    const { t } = useTranslation();

    const handleChooseStep = (step: IStep) => {
        setActiveStep(step);
    };

    useEffect(() => {
        steps.map(el => {
            if (el.title === activeStep.title) {
                setActiveStep(el);
                return;
            }
        })
    }, [steps]);

    return (
        <div className={s.customStepper}>
            <div className={s.steps} style={center ? { justifyContent: "center" } : { justifyContent: "left" }}>
                {
                    steps.map(step => (
                        <div
                            key={step.title}
                            className={step.title === activeStep?.title ? s.activeStep : s.commonStep}
                            onClick={() => handleChooseStep(step)}
                        >
                            {t(step.title)}
                        </div>
                    ))
                }
            </div>
            <div className={s.activeStepContent}>
                {
                    !CustomComponentProps 
                        ? <CustomComponent />
                        : <CustomComponent {...CustomComponentProps} />
                }
            </div>
        </div>
    )
}
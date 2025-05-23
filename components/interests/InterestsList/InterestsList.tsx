
import { IInterest } from "@/entities/interest";
import CustomAccordion from "@/shared/ui/CustomAccordion/CustomAccordion";
import s from "./InterestsList.module.scss";

interface IInterestsListProps {
    list: IInterest[]
}

export default function InterestsList({ list }: IInterestsListProps) {
    return (
        <div className={s.interestsList}>
            {
                list?.map((el) => (
                    <div className={s.listElem} key={el.interestId}>
                        <CustomAccordion
                            key={el.interestId}
                            text={el.title}
                            subText="Описание для выбранного Вами интереса"
                        />
                    </div>
                ))
            }
        </div>
    )
}
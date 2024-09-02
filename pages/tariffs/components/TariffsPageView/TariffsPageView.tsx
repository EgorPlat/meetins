import CustomButton from "../../../../shared/ui/CustomButton/CustomButton";
import { ITariff } from "../../../../entities/tariffs";
import s from "./TariffsPageView.module.scss";

export default function TariffsPageView(props: {
    tariffsData: ITariff[]
}) {

    return (
        <div className={s.tariffsPageView}>
            <div className={s.tarrifsList}>
                {
                    props.tariffsData?.map((tariff) => (
                        <div className={s.tariffView} key={tariff.title} >
                            <div className={s.title}>
                                {tariff.title}
                            </div>
                            <div className={s.period}>
                                {tariff.periodMonth} Мес.
                            </div>
                            <div className={s.oppotunitiesList}>
                                Преимущества:
                                {
                                    tariff.opportunities?.map(oppotunity => (
                                        <div className={s.oppotunity} key={oppotunity.title}>
                                            <div className={s.title}>
                                                {oppotunity.title}
                                            </div>
                                            <div className={s.description}>
                                                {oppotunity.description}
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className={s.price}>
                                {tariff.price} руб
                            </div>
                            <div className={s.actions}>
                                <CustomButton text="Приобрести" />
                            </div>
                        </div>
                    ))
                }
            </div> 
        </div>
    )
}
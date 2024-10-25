import Link from "next/link";
import TurnOffOn from "../../../../shared/ui/TurnOffOn/TurnOffOn";
import s from "./InterestsAbout.module.scss";

export default function InterestsAbout() {
    return (
        <div className={s.interestsAbout}>
            <div className={s.title}>Описание</div>
            <div className={s.description}>
                С помощью интересов пользователи сайта могут обозначить области
                в которых им интересно развиваться. Если у пользователя есть хотя бы 1 интерес, пользователь может
                получить доступ к функции "Фильтрация контента".
            </div>
            <div className={s.title}>Настройка интересов</div>
            <div className={s.description}>
                Каждый пользователь может настроить свои интересы на странице Профиля в графе "Интересы". Для этого
                нужно из списка предложенных интересов выбрать те, которые нужны конкретному пользователю. Пример:
                <div className={s.example}>
                    <div className={s.interestInactive}>Шахматы</div>
                    <div>{"->"}</div>
                    <div className={s.interestActive}>Шахматы</div>
                </div>
                В данном случае, зеленым помечен доступный для выбора интерес, а голубым интерес, который уже выбран пользователем.
            </div>
            <div className={s.title}>Преимущества</div>
            <div className={s.description}>
                Если пользователь не выбрал ни один из предоставленных интересов, он не может расчитывать на ипользование функции
                "Фильтрация контента". Это означает, что количество потенциально неинтересного для пользователя контента может быть велико.
                Например, в новостной ленте могут попадаться публикации от других пользователей или сообществ с которыми у данного пользователя
                различаются группы интересов.
            </div>
            <div className={s.title}>Активация "Фильтров контента"</div>
            <div className={s.description}>
                Для активации функции "Фильтры контента" необходимо перейти на 
                страницу <Link href="/settings">Настройки</Link> и в соответствующем месте
                активировать ползунок. Пример:
                <div className={s.example}>
                    <TurnOffOn 
                        inithialStatus={false} 
                        readOnly
                    />
                    <span>{"->"}</span>
                    <TurnOffOn 
                        inithialStatus={true} 
                        readOnly
                    />
                </div>
            </div>
        </div>
    )
}
import s from './eventMoreInfo.module.scss';

export default function EventMoreInfo(props: {
    favoritesCount: number,
    price: string,
    siteUrl: string,
    tags: string[]
}) {
    return (
        <div className={s.eventMoreInfo}>
            <div className={s.eventMoreInfoData}>
                <div className={s.block}>Записалось: {props.favoritesCount}</div>
                <div className={s.block}>
                    Цена: {props.price.length > 0 ? props.price : 'Бесплатно'}
                </div>
                <div className={s.block}>
                    <a href={props.siteUrl} target="_blank">Перейти на сайт организатора</a>
                </div>
            </div>
            <div className={s.eventMoreInfoTags}>
                {
                    props.tags.map(el => (
                        <div className={s.tag}>{el.split(' ')[0]}</div>
                    ))
                }
            </div>
        </div>
    )
}
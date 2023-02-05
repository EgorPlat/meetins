import s from './mainPageInfo.module.scss'
import { useStore } from 'effector-react'
import { useEffect } from 'react'
import {
	$mainPageInfo,
	getMainPageInfo,
} from '../../../global/store/mainpage_model'

export default function MainPageInfo(): JSX.Element {
	useEffect(() => {
		getMainPageInfo();
	}, [])

	const mainPageInfo = useStore($mainPageInfo)
	return (
		<section className={`${s.pageInfo} ${s.infoPage}`}>
			<div className={`${s.infoPageContainer} _container`}>
				{mainPageInfo.map((info) => {
					return (
						<div
							key={info.mainText}
							style={
								mainPageInfo.indexOf(info) % 2 === 0
									? { flexDirection: 'row-reverse' }
									: { flexDirection: 'row' }
							}
							className={s.infoPageRow}>
							<h2 className={s.infoPageTitle}>{info.mainText}</h2>
							<p className={s.infoPageText}>{info.description}</p>
						</div>
					)
				})}
			</div>
		</section>
	)
}

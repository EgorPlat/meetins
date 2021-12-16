import Link from 'next/link'
import Image from 'next/image'
import s from './mainPageLogo.module.scss'
import thin_logo from '../../../public/images/thin_logo.svg'

export default function MainPageLogo(): JSX.Element {
	return (
		<section className={s.pageLogo}>
			<div className={`${s.logoContainer} _container`}>
				<div className={s.logoBody}>
					<div className={s.logoLeft}>
						<div className={s.logoLogo}>
							<Link href='/' passHref>
								<div className={s.logoLink}>
									<picture>
										<source
											srcSet={thin_logo}
											type='image/webp'
										/>
										<Image
											width={94}
											height={102}
											src={thin_logo}
											alt='logo'
										/>
									</picture>
									<p className={s.logoLabel}>Meetins</p>
								</div>
							</Link>
							<p className={s.logoText}>
								откройте для себя новое
							</p>
						</div>
					</div>
					<div className={s.logoRight}>
						<Link href='/register' passHref>
							<span className={`${s.logoBtn} btn`}>
								Присоединиться
							</span>
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}

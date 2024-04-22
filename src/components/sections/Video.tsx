import Section from '@shared/Section'

import styles from './Video.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

export default function Vedio() {
  return (
    <Section>
      <video autoPlay loop muted poster="/assets/poster.jpg">
        <source src="../assets/main.webm" type="video/webm" />
        <source src="../../assets/main.mp4" type="video/mp4" />
      </video>
    </Section>
  )
}

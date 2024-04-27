import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import styles from './App.module.scss'

import Heading from '@components/sections/Heading'
import Video from '@components/sections/Video'
import ImageGallery from '@components/sections/ImageGallery'
import Intro from '@components/sections/Intro'
import Calendar from '@components/sections/Calendar'
import Map from '@components/sections/Map'
import Contact from '@components/sections/Contact'
import AttendCountModal from '@components/AttendCountModal'

import FullScreenMessage from '@shared/FullScreenMessage'

import { Wedding } from '@models/wedding'
import Invitation from '@components/sections/Invitation'

const cx = classNames.bind(styles)

function App() {
  const [wedding, setWedding] = useState<Wedding | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  //1.wedding데이터 호출
  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:8888/wedding')
      .then((response) => {
        if (response.ok === false) {
          throw new Error('에러가 발생했습니다.')
        }
        return response.json()
      })
      .then((data) => {
        setWedding(data)
      })
      .catch((e) => {
        console.log('에러발생', e)
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <FullScreenMessage type="loading" />
  }

  if (error) {
    return <FullScreenMessage type="error" />
  }

  if (wedding == null) {
    return null
  }
  const {
    location,
    groom,
    bride,
    galleryImages,
    date,
    message: { intro, invitation },
  } = wedding

  return (
    <div className={cx('container')}>
      <Heading date={date} />
      <Video />
      <Intro
        groomName={groom.name}
        brideName={bride.name}
        locationName={location.name}
        date={date}
        message={intro}
      />
      <Invitation message={invitation} />
      <ImageGallery images={galleryImages} />
      <Calendar date={date} />
      <Map location={location} />
      <Contact groom={groom} bride={bride} />
      <AttendCountModal wedding={wedding} />
    </div>
  )
}

export default App

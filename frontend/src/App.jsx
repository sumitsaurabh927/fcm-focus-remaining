import { useEffect, useState } from 'react'
import { messaging } from './firebase'
import { getToken } from 'firebase/messaging'
import axios from 'axios'
import './App.css'

function App() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  async function requestPermission() {
    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
      // get token
      // vapid key is availabe in firebase console in project settings
      const token = await getToken(messaging, { vapidkey: '' })
      console.log('generated: ', token)
    } else if (permission === 'denied') {
      alert('Persmission denied!')
    }
  }

  useEffect(() => {
    requestPermission();
  }, [])

  const onClickHandler = async (e) => {
    e.preventDefault()
    // console.log('clicked')
    await axios.post('http://localhost:3001/sendNotif/create', { title, body })
    setBody('')
    setTitle('')
  }
  return (
    <>
      <h1>Hi FCM!</h1>
      <form onSubmit={onClickHandler}>
        <input placeholder='Enter notification title' onChange={(e) => setTitle(e.target.value)} value={title} />
        <input placeholder='Enter notification text' onChange={(e) => setBody(e.target.value)} value={body} />
        <button >Submit</button>
      </form>
    </>
  )
}

export default App

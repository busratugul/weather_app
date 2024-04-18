import { useContext, useEffect } from 'react'
import WeatherContext from '../context/WeatherContext'
import { FaCheckCircle } from 'react-icons/fa'
import { FaExclamationCircle } from 'react-icons/fa'

function Notifications() {
  const { notification, setNotification } = useContext(WeatherContext)

  useEffect(() => {
    if (notification.visible) {
      const timer = setTimeout(() => {
        setNotification((prev) => ({ ...prev, visible: false }))
      }, 2000)
      return () => {
        clearTimeout(timer)
      }
    }
  })

  if (!notification.visible) {
    return null
  }
  return (
    <div className="fixed min-w-72 max-h-28 top-4 right-3 z-50">
      <div className="bg-slate-200 rounded-md shadow-md p-3">
        <p className="text-sm font-medium text-gray-800 flex items-center">
          {notification.type === 'success' ? (
            <FaCheckCircle className="me-2 text-green-400" />
          ) : (
            <FaExclamationCircle className="me-2 text-red-400" />
          )}
          {notification.type === 'success' ? 'Başarılı' : 'Dikkat'}
        </p>
        <p className="text-sm text-gray-600 mt-2 ms-6">
          {notification.content}
        </p>
      </div>
    </div>
  )
}

export default Notifications

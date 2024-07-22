const Notification = ({ notification }) => {
  if (notification === null) return

  return (
    <p>{notification}</p>
  )

}
export default Notification
import {useToast} from "react-crisp-toast";

function App() {
  const {addToast} = useToast()
  const showToast = ()=>{
    addToast({
      message: "Hello world" 
    })
  }
  return (
  <div style={{height:"90vh",flexDirection:"column", display:"flex", alignItems:"center", justifyContent:"center"}}>
     
      <img src="../favicon.png" alt="logo" width={300}/>
      <br/>
      <button
        onClick={showToast}
        style={{
          padding: "15px 30px",
          fontSize: "18px",
          backgroundColor: "#FFD700",
          color: "#121212",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          transition: "background-color 0.3s",
        }}
      >Show Toast</button> 
  </div>)
}

export default App

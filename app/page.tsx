import { ContainerInfo } from "./components/container-info";

export default function Home(){
  return(

<div className="list-container  grid grid-cols-1 sm:grid-cols-2 sm:gap-x-30 md:grid-cols-2 lg:grid-cols-3 gap-8">        

          <div className=" font-bold sm:bg-amber-300 sm:text-2xl">
      <ContainerInfo title="Usuarios seguem:" users={[ "Maria"]}/>
          </div>
          <div className="w-full md:mx-6">
      <ContainerInfo title="Usuarios seguem:" users={[ "Maria"]}/>
          </div>
          <div className="w-full">
      <ContainerInfo title="Usuarios seguem:" users={[ "Maria"]}/>
          </div>
          <div className="w-full">
      <ContainerInfo title="Usuarios seguem:" users={["mateus", "felipe","Maria","mateus", "felipe","Maria","mateus", "felipe","Maria"]}/>
          </div>

    </div>


  )
}

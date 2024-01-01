
"use client"
import Header from "@/components/common/Header"
import { UserProvider, useUserContext } from "@/providers/UserProvider"
import { useRouter } from "next/router"
import { useEffect } from "react"

const DefaultLayout = ({children}: {children: React.ReactNode}) => {
  // useEffect(()=> {
  //   const handleRouteChange = (url: string) => {
  //     const userIsAuthenticated = true
  //     console.log(userIsAuthenticated)
  //   }
  //   router.events.on("routeChangeStart", handleRouteChange)
  // },[])
  return (
    <UserProvider>
        <Header />
        {children}
    </UserProvider>
  )
}

export default DefaultLayout
import { AuthContext, IAuthContext } from "@/components/global/AuthProvier"
import { useContext } from "react"

const useAuth = () => {
    const context = useContext(AuthContext)
    return context as IAuthContext
}

export default useAuth
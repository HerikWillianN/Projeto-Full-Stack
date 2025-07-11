import { useState } from "react"

export default function orderServices() {
    const [orderLoading, setOrderLoading] = useState(false)
    const [refetchOrders, setRefetchOrders] = useState(true)
    const [ordersList, setOrdersList] = useState([])

    const url = 'http://localhost:3000/orders'

    const getUserOrders = (userId) => {
        setOrderLoading(true)

        fetch(`${url}/userorders/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        })
            .then((response) => response.json())
            .then((result) => {
                if(result.success) {
                    setOrdersList(result.body)
                } else {
                    console.log(result)
                }
            })
            .catch((error) => {
                console.error("Erro ao fazer login:", error)
            })
            .finally(() => {
                setOrderLoading(false)
                setRefetchOrders(false)
            })
        }

    return { getUserOrders, orderLoading, refetchOrders, ordersList }
}
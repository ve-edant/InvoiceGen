"use client"
import { Button } from '@/app/Components/UI/Button'
import { useRouter } from 'next/navigation';
import React from 'react'

type Props = {
  invoiceId: string;
};

const ViewButton = ({invoiceId}: Props) => {
    const router = useRouter()
    const handleView = () => {
        router.push(`/dashboard/invoice-edit/${invoiceId}`)
    }
  return (
    <div>
        <Button variant="default" onClick={()=>handleView()}>View</Button>
    </div>
  )
}

export default ViewButton
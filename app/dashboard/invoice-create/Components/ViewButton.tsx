import { Button } from '@/app/Components/UI/Button'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
  InvoiceId: string;
};

const ViewButton = ({InvoiceId}: Props) => {
    const router = useRouter()
    const handleView = () => {
        router.push(`/dashboard/invoice-edit/${InvoiceId}`)
    }
  return (
    <div>
        <Button variant="default">View</Button>
    </div>
  )
}

export default ViewButton
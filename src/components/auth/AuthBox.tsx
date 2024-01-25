import { FaDiscord } from 'react-icons/fa6'

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { GoogleAuthButton } from './GoogleAuthButton'

export const AuthBox = () => {
  return (
    <Card className='shadow-xl bg-[#F2F3F5] dark:bg-[#2B2D31] border-none text-center p-5'>
      <CardHeader className='space-y-5 flex items-center'>
        <FaDiscord size={72} />
        <CardTitle>Welcome to discord clone</CardTitle>
        <CardDescription>select you sign in method</CardDescription>
      </CardHeader>
      <CardContent>
        <Separator className='h-[3px] mb-5 bg-[#e1e2e5] dark:bg-[#292a2d]' />
        <div className='space-y-3'>
          <GoogleAuthButton />
        </div>
      </CardContent>
    </Card>
  )
}

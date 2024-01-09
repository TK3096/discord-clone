import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface ActionTooltipProps {
  label: string
  children: React.ReactNode
  side?: 'top' | 'bottom' | 'right' | 'left'
  align?: 'center' | 'start' | 'end'
}

export const ActionTooltip = (props: ActionTooltipProps) => {
  const { label, side, align, children } = props

  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p className='capitalize font-semibold text-sm'>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

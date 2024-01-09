import { Plus } from 'lucide-react'

import { ActionTooltip } from '@/components/common/action-tooltip'

export const AddServerBtn = () => {
  return (
    <div>
      <ActionTooltip label='add new server' side='right' align='center'>
        <button className='group'>
          <div className='flex justify-center items-center mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all bg-background dark:bg-neutral-700 group-hover:bg-emerald-500'>
            <Plus
              className='transition text-emerald-500 group-hover:text-white'
              size={28}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  )
}

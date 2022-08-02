import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { Box } from '@mui/system'
function Whatsapp() {
    const contact = useSelector(s=>s.main.configs)
  return (
    <Link href={contact&&contact.contactus&&contact.contactus.whatsapp_link||"#"}>
        <a id="whatsapp_link" target={"_blank"}>
            <Box sx={{position: "fixed", right: "16px", bottom: "16px", "zIndex": "999"}} className="mb-5 mb-md-0">
                <Image src="/whatsapp.png" alt="whatsapp" width={65} height={64}/>
            </Box>
        </a>
    </Link>
  )
}

export default Whatsapp
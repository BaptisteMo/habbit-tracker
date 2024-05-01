'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from '@/components/ui/dialog'


export default function PwaButton() {

    const [showDialog, setShowDialog] =useState<boolean>(false)
    const [prompt, setPrompt]= useState<any>(null);

    useEffect(()=>{
        const handleBeforeInstallPrompt = (event:any) => {
            event.preventDefault();
            setPrompt(event);
            
            if(!window.matchMedia(`(display-mode: standalone)`).matches){
                setShowDialog(true);
            }
        }
        window.addEventListener(`beforeinstallprompt`, handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener(`beforeinstallprompt`, handleBeforeInstallPrompt);
        }

    })
    const handleInstallClick = () => {
        if(prompt){
            prompt.prompt();
            
            prompt.userChoice.then((choiceResult: any)=> {
                if(choiceResult.outcome ==="accepted"){
                    console.log('accepted')
                }else{  
                    console.log('Denied')
                }
                setPrompt(null);
            })
            
        }
    };


  return (
    <div className='sm:hidden'>
    {showDialog ? (
      <Dialog>
        <DialogTrigger asChild>
            <Button 
            className='m-auto'
            variant={'default'}>
                Télécharger l'app
            </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Télécharger l'app</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => handleInstallClick()}>
              Télécharger l'app
            </Button>
            <DialogClose>
              <Button
                variant={'secondary'}

              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ) : (
        null
    )}
  </div>
  )
}

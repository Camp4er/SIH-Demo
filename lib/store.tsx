'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

export type Status = 'Pending' | 'In Progress' | 'Resolved'


export type Message = { id: string; from: 'citizen' | 'authority'; text: string; time: string }


export type Complaint = {
id: string
title: string
description: string
category: string
photo?: string
anonymous?: boolean
status: Status
createdAt: string
messages: Message[]
location?: { lat: number; lng: number }
}

type Store = {
    complaints: Complaint[]
    createComplaint: (c: Partial<Complaint>) => Complaint
    updateStatus: (id: string, status: Status) => void
    addMessage: (id: string, message: Omit<Message, 'id' | 'time'>) => void
    }
    
    
    const StoreContext = createContext<Store | null>(null)
    
    
    export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    const [complaints, setComplaints] = useState<Complaint[]>([])
    
    
    useEffect(() => {
    const raw = localStorage.getItem('sih-complaints')
    if (raw) setComplaints(JSON.parse(raw))
    }, [])
    
    
    useEffect(() => {
    localStorage.setItem('sih-complaints', JSON.stringify(complaints))
    }, [complaints])

    function createComplaint(c: Partial<Complaint>) {
        const comp: Complaint = {
        id: uuidv4(),
        title: c.title || 'Untitled',
        description: c.description || '',
        category: c.category || 'General',
        photo: c.photo,
        anonymous: !!c.anonymous,
        status: 'Pending',
        createdAt: new Date().toISOString(),
        messages: [],
        location: c.location || { lat: 23.7, lng: 85.3 },
        }
        setComplaints(prev => [comp, ...prev])
        return comp
        }
        
        
        function updateStatus(id: string, status: Status) {
        setComplaints(prev => prev.map(p => p.id === id ? { ...p, status } : p))
        }
        
        
        function addMessage(id: string, message: Omit<Message, 'id' | 'time'>) {
        const msg: Message = { id: uuidv4(), ...message, time: new Date().toISOString() }
        setComplaints(prev => prev.map(p => p.id === id ? { ...p, messages: [...p.messages, msg] } : p))
        }

        return (
            <StoreContext.Provider value={{ complaints, createComplaint, updateStatus, addMessage }}>
            {children}
            </StoreContext.Provider>
            )
            }
            
            
            export function useStore() {
            const ctx = useContext(StoreContext)
            if (!ctx) throw new Error('useStore must be used inside StoreProvider')
            return ctx
            }
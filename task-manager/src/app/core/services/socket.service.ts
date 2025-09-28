import { Injectable, NgZone } from '@angular/core';
import io, { Socket} from "socket.io-client";
import { environment } from '../../../environments/environment.development';
import {BehaviorSubject, Observable } from 'rxjs';
import { TokenStorage } from '../token-storage';

export type TaskEvent = {type:'created';data:any} | {type:'updated'; data:any} | {type:'deleted'; data:any};

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  // constructor(private zone: NgZone) {}
  private socket:any;
  private taskEvents$ = new BehaviorSubject<TaskEvent | null>(null);
  apiBase = environment.apiUrl.replace("/api",'');
  constructor(private zone: NgZone) {  }

  connect() {
    if(this.socket) return;
    const token = TokenStorage.get();
    this.socket = io(this.apiBase, {
      auth: {token},
      path: '/socket.io'
    })

    this.socket.on('connect', () =>
      console.log('socket connected:', this.socket?.id)
    );
    this.socket.on('connect_error', (err: any) => {
      console.error('connect_error:', err?.message, err);
    });
    this.socket.on('error', (err: any) => console.error('socket error:', err));
    this.socket.on('connected', (payload:any) => console.log('👋 server connected evt:', payload));


    this.socket.on('disconnect',(reason:any)=>{
      console.log(reason, "disconnected")
      //option socket disconnected
    })

    const onTasksChanged = (evt: TaskEvent) => {
      this.zone.run(() => {
        console.log('👂 tasks:changed', evt);
        this.taskEvents$.next(evt);
      });
    };
    this.socket.on('tasks:changed', onTasksChanged)
   this.socket.onAny((event:any, ...args:any) =>
     console.log('📡 onAny ->', event, args?.[0])
   );

   // keep a reference so we can off() on disconnect
   (this.socket as any).__onTasksChanged = onTasksChanged; 
  }

 disconnect() {
    if (!this.socket) return;
    // remove specific listeners (type-safe)
    const onTasksChanged = (this.socket as any).__onTasksChanged;
    if (onTasksChanged) this.socket.off('tasks:changed', onTasksChanged);
    this.socket.off('connected');
    this.socket.off('connect');
    this.socket.off('disconnect');
    this.socket.off('connect_error');

    this.socket.disconnect();
    this.socket = undefined;
    this.taskEvents$.next(null);
  }

  onTaskEvents():Observable<TaskEvent| null> {
      return this.taskEvents$.asObservable();
  }
}

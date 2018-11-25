import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor() { }
}

export interface Post {
  id?: string;
  title: string;
}

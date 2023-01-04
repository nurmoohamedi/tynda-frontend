import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor() { }

  getPlaylists() {
    return [
      { id: 1, name: "Noor" },
      { id: 2, name: "Boor" },
      { id: 3, name: "Soor" }
    ]
  }
}

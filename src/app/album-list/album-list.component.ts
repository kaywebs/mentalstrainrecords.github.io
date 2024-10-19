import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-album-list',
  standalone: true,
  imports: [CommonModule, RouterModule], // Import CommonModule and RouterModule
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {
  albums: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAlbums();
  }

  fetchAlbums(): void {
    this.getAlbums().subscribe(
      albums => {
        this.albums = albums;
      },
      error => {
        console.error('Error fetching albums:', error);
      }
    );
  }

  getAlbums(): Observable<any[]> {
    return this.http.get<any[]>('/albums.json');
  }
}
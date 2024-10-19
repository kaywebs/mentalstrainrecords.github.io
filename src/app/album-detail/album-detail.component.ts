import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Location } from '@angular/common'; // Import Location service

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css'],
  standalone: true, // Mark the component as standalone
  imports: [CommonModule] // Add CommonModule to imports
})
export class AlbumDetailComponent implements OnInit {
  albumId: string | null = null;
  album: any = null;

  constructor(private route: ActivatedRoute, private http: HttpClient, private location: Location) {} // Inject Location service

  ngOnInit(): void {
    this.albumId = this.route.snapshot.paramMap.get('id');
    this.fetchAlbumDetails(this.albumId);
  }

  fetchAlbumDetails(id: string | null): void {
    this.getAlbums().subscribe(
      albums => {
        this.album = albums.find(album => album.id === id);
      },
      error => {
        console.error('Error fetching albums:', error);
      }
    );
  }

  getAlbums(): Observable<any[]> {
    return this.http.get<any[]>('/albums.json');
  }

  goBack(): void {
    this.location.back(); // Navigate back to the previous page
  }
}
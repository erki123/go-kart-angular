import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RaceService } from '../../services/race.service';
import { Race } from '../../models/race';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-race',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css'],
  providers: [RaceService],
})
export class RaceComponent implements OnInit {
  races: Race[] = [];
  newRace: Race = { id: 0, trackID: 0, memberID: 0, year: 0, points: 0 };
  selectedRace: Race | null = null;
  isAddRaceFormVisible: boolean = false;

  constructor(private raceService: RaceService) { }

  ngOnInit(): void {
    this.loadRaces();
  }

  loadRaces(): void {
    this.raceService.getRaces().subscribe(
      data => this.races = data,
      error => console.log(error)
    );
  }

  addRace(): void {
    this.raceService.addRace(this.newRace).subscribe(
      data => {
        this.races.push(data);
        this.newRace = { id: 0, trackID: 0, memberID: 0, year: 0, points: 0 };
        this.isAddRaceFormVisible = false;
      },
      error => console.log(error)
    );
  }

  updateRace(): void {
    if (this.selectedRace) {
      console.log('Updating race:', this.selectedRace); // Add this line for debugging
      this.raceService.updateRace(this.selectedRace).subscribe(
        data => {
          console.log('Updated race from backend:', data); // Add this line for debugging
          const index = this.races.findIndex(race => race.id === data.id);
          if (index !== -1) {
            this.races[index] = data;
          }
          this.selectedRace = null;
        },
        error => console.log(error)
      );
    }
  }

  deleteRace(id: number): void {
    if (confirm('Are you sure you want to delete this race?')) {
      this.raceService.deleteRace(id).subscribe(
        () => {
          this.races = this.races.filter(race => race.id !== id);
        },
        error => {
          console.log(error);
          alert('Failed to delete race. Please try again.');
        }
      );
    }
  }

  selectRace(race: Race): void {
    this.selectedRace = { ...race };
    this.isAddRaceFormVisible = false; // Hide add form when editing
  }

  clearSelection(): void {
    this.selectedRace = null;
  }

  showAddRaceForm(): void {
    this.isAddRaceFormVisible = true;
    this.selectedRace = null; // Ensure no race is selected when adding a new race
  }

  hideAddRaceForm(): void {
    this.isAddRaceFormVisible = false;
  }
}

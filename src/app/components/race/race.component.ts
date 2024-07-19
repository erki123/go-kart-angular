import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RaceService } from '../../services/race.service';
import { TrackService } from '../../services/track.service';
import { MemberService } from '../../services/member.service';
import { Race } from '../../models/race';
import { Track } from '../../models/track';
import { Member } from '../../models/member';
import { FormsModule } from '@angular/forms';
import { RegistrationService } from '../../services/registration.servive';
import { Registration } from '../../models/registration';

import { Modal } from 'bootstrap';


@Component({
  selector: 'app-race',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css'],
  providers: [RaceService, TrackService, MemberService, RegistrationService],
})
export class RaceComponent implements OnInit {
  races: Race[] = [];
  newRace: Race = { id: 0, name: '', location: '', time: '', description: '' };
  selectedRace: Race | null = null;
  isAddRaceFormVisible: boolean = false;

  tracks: Track[] = [];
  newTrack: Track = { id: 0, name: '', trackLength: 0 };
  selectedTrack: Track | null = null;
  isAddTrackFormVisible: boolean = false;

  members: Member[] = [];
  selectedMemberId: number | null = null;

  locations: string[] = [
    'Aravete', 'Audru', 'Haapsalu', 'Laagri', 'Laitse', 'Lange',
    'Kuningamäe', 'Käina', 'Pärnu', 'Raassilla', 'Rapla', 'Tabasalu', 'Õismäe'
  ];

  constructor(
    private raceService: RaceService,
    private trackService: TrackService,
    private memberService: MemberService,
    private registrationService: RegistrationService
  ) {}

  ngOnInit(): void {
    this.loadRaces();
    this.loadTracks();
    this.loadMembers();
  }

  loadRaces(): void {
    this.raceService.getRaces().subscribe(
      (data) => (this.races = data),
      (error) => console.log(error)
    );
  }

  addRace(): void {
    this.raceService.addRace(this.newRace).subscribe(
      (data) => {
        this.races.push(data);
        this.newRace = { id: 0, name: '', location: '', time: '', description: '' };
        this.isAddRaceFormVisible = false;
      },
      (error) => console.log(error)
    );
  }

  updateRace(): void {
    if (this.selectedRace) {
      console.log('Updating race:', this.selectedRace); // Debug log
      this.raceService.updateRace(this.selectedRace).subscribe(
        (data) => {
          console.log('Updated race from backend:', data); // Debug log
          const index = this.races.findIndex((race) => race.id === data.id);
          if (index !== -1) {
            this.races[index] = data;
          }
          this.selectedRace = null;
          this.isAddRaceFormVisible = false;
        },
        (error) => console.log(error)
      );
    }
  }

  deleteRace(id: number): void {
    if (confirm('Are you sure you want to delete this race?')) {
      this.raceService.deleteRace(id).subscribe(
        () => {
          this.races = this.races.filter((race) => race.id !== id);
        },
        (error) => {
          console.log(error);
          alert('Failed to delete race. Please try again.');
        }
      );
    }
  }

  selectRace(race: Race): void {
    this.selectedRace = { ...race };
    this.isAddRaceFormVisible = true; // Show the form when editing
  }

  clearRaceSelection(): void {
    this.selectedRace = null;
    this.isAddRaceFormVisible = false; // Hide the form when clearing selection
  }

  showAddRaceForm(): void {
    this.isAddRaceFormVisible = true;
    this.selectedRace = null;
  }

  hideAddRaceForm(): void {
    this.isAddRaceFormVisible = false;
  }

  loadTracks(): void {
    this.trackService.getTracks().subscribe(
      (data) => (this.tracks = data),
      (error) => console.log(error)
    );
  }

  addTrack(): void {
    this.trackService.addTrack(this.newTrack).subscribe(
      (data) => {
        this.tracks.push(data);
        this.newTrack = { id: 0, name: '', trackLength: 0 };
        this.isAddTrackFormVisible = false;
      },
      (error) => console.log(error)
    );
  }

  updateTrack(): void {
    if (this.selectedTrack) {
      console.log('Updating track:', this.selectedTrack);
      this.trackService.updateTrack(this.selectedTrack).subscribe(
        (data) => {
          console.log('Updated track from backend:', data);
          const index = this.tracks.findIndex((track) => track.id === data.id);
          if (index !== -1) {
            this.tracks[index] = data;
          }
          this.selectedTrack = null;
        },
        (error) => console.log(error)
      );
    }
  }

  deleteTrack(id: number): void {
    if (confirm('Are you sure you want to delete this track?')) {
      this.trackService.deleteTrack(id).subscribe(
        () => {
          this.tracks = this.tracks.filter((track) => track.id !== id);
        },
        (error) => {
          console.log(error);
          alert('Failed to delete track. Please try again.');
        }
      );
    }
  }

  selectTrack(track: Track): void {
    this.selectedTrack = { ...track };
    this.isAddTrackFormVisible = false;
  }

  clearTrackSelection(): void {
    this.selectedTrack = null;
  }

  showAddTrackForm(): void {
    this.isAddTrackFormVisible = true;
    this.selectedTrack = null;
  }

  hideAddTrackForm(): void {
    this.isAddTrackFormVisible = false;
  }

  loadMembers(): void {
    this.memberService.getMembers().subscribe(
      (data) => (this.members = data),
      (error) => console.log(error)
    );
  }

   // Registration-related methods
     openRegisterModal(race: Race): void {
    this.selectedRace = race;
    const modalElement = document.getElementById('registrationModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  registerMemberToRace(): void {
    if (this.selectedMemberId && this.selectedRace) {
      const selectedMember = this.members.find(member => member.id === this.selectedMemberId);
      if (selectedMember) {
        const registration: Registration = {
          id: 0,
          member: selectedMember,
          race: this.selectedRace
        };
  
        this.registrationService.addRegistration(registration).subscribe(
          data => {
            alert('Member registered to race successfully.');
            this.selectedMemberId = null;
            const modalElement = document.getElementById('registrationModal');
            if (modalElement) {
              const modal = Modal.getInstance(modalElement);
              if (modal) {
                modal.hide();
              }
            }
  
            // Ensure selectedRace is not null
            if (this.selectedRace) {
              // Update the participantsToRaces field in the frontend
              selectedMember.participantsToRaces!.push(`${this.selectedRace.name!} (${selectedMember.id})`);
              const index = this.members.findIndex(member => member.id === selectedMember.id);
              if (index !== -1) {
                this.members[index] = selectedMember;
              }
            }
          },
          error => console.log(error)
        );
      }
    } else {
      alert('Please select a member and a race.');
    }
  }
  
  
  
  
}

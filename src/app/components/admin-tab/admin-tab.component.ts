import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MemberService } from '../../services/member.service';
import { Member } from '../../models/member';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-tab',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './admin-tab.component.html',
  styleUrls: ['./admin-tab.component.css'],
  providers: [MemberService],
})
export class AdminTabComponent implements OnInit {
  members: Member[] = [];
  newMember: Member = { id: 0, name: '', email: '', memberStatus: '', phone: '', imageUrl: '', memberCode: '' };
  selectedMember: Member | null = null;

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {
    this.memberService.getMembers().subscribe(
      data => this.members = data,
      error => console.log(error)
    );
  }

  addMember(): void {
    this.memberService.addMember(this.newMember).subscribe(
      data => {
        this.members.push(data);
        this.newMember = { id: 0, name: '', email: '', memberStatus: '', phone: '', imageUrl: '', memberCode: '' };
      },
      error => console.log(error)
    );
  }

  updateMember(): void {
    if (this.selectedMember) {
      console.log('Updating member:', this.selectedMember); // Add this line for debugging
      this.memberService.updateMember(this.selectedMember).subscribe(
        data => {
          console.log('Updated member from backend:', data); // Add this line for debugging
          const index = this.members.findIndex(member => member.id === data.id);
          if (index !== -1) {
            this.members[index] = data;
          }
          this.selectedMember = null;
        },
        error => console.log(error)
      );
    }
  }

  deleteMember(id: number): void {
    this.memberService.deleteMember(id).subscribe(
      () => {
        this.members = this.members.filter(member => member.id !== id);
      },
      error => {
        console.log(error);
        alert('Failed to delete member. Please try again.');
      }
    );
  }

  selectMember(member: Member): void {
    this.selectedMember = { ...member };
  }

  clearSelection(): void {
    this.selectedMember = null;
  }
}
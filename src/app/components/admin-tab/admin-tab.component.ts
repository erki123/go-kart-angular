import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { MemberService } from '../../services/member.service';
import { Member } from '../../models/member';

@Component({
  selector: 'app-admin-tab',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // Ensure HttpClientModule is in the imports array
  templateUrl: './admin-tab.component.html',
  styleUrls: ['./admin-tab.component.css'],
  providers: [MemberService], // Ensure MemberService is provided
})
export class AdminTabComponent implements OnInit {
  members: Member[] = [];

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.memberService.getMembers().subscribe(
      data => this.members = data,
      error => console.log(error)
    );
  }
}
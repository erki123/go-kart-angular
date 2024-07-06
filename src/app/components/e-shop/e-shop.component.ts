import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-e-shop',
  templateUrl: './e-shop.component.html',
  styleUrls: ['./e-shop.component.css']
})
export class EShopComponent implements OnInit {
  products = [
    {
      id: 1,
      title: 'Product 1',
      description: 'This is a short description of product 1.',
      price: 19.99,
      imageUrl: 'https://placehold.co/300x300/0000FF/808080?text=Product1'
    },
    {
      id: 2,
      title: 'Product 2',
      description: 'This is a short description of product 2.',
      price: 29.99,
      imageUrl: 'https://placehold.co/300x300/0000FF/808080?text=Product2'
    },

  ];

  constructor() { }

  ngOnInit(): void {
    
  }
}
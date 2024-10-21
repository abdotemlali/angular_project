import { Component, OnInit, Input } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from "@angular/common";
import {Product} from "../model/Product";
import {SharedService} from "../shared-service.service";
import {Commentaire} from "../model/Commentaire";

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DatePipe
  ],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() productId!: number;
  comments: any[] = [];
  product !: Product;
  commentForm!: FormGroup;

  constructor(private fb: FormBuilder, private sharedService: SharedService) {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      content: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit(): void {
    this.sharedService.commentaires$.subscribe((data:any)=>{
      this.comments=data;
    }) // Load comments for the product
  }


  loadComments() {
    this.comments = this.sharedService.getCommentairesForProduit(this.productId);
  }

  addComment() {
    if (this.commentForm.valid) {
      const newComment = new Commentaire(
        this.comments.length + 1, // Incremental ID for demo purposes
        this.productId,
        this.commentForm.value.author,
        this.commentForm.value.content,
        new Date()
      );

      this.sharedService.addCommentaire(newComment);
      this.commentForm.reset();
    }
  }


  get author() {
    return this.commentForm.get('author');
  }

  get content() {
    return this.commentForm.get('content');
  }
}

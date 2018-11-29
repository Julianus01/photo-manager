import { Component, OnInit, Input } from '@angular/core';
import { TagsService, Tag } from 'src/app/services/tags/tags.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  @Input() postId: string;
  @Input() user: firebase.User;

  tags: Observable<Tag[]>;

  constructor(
    private tagsService: TagsService,
  ) { }

  ngOnInit() {
    this.tags = this.tagsService.getTags(this.user.uid, this.postId);
  }

  public async deleteTag(tagId: string) {
    await this.tagsService.deleteTag(this.user.uid, this.postId, tagId);
  }

}

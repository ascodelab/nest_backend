/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';
import { CommonModule } from 'src/common/common.module';

@Injectable()
export class BlogService {
  //implement constructor
  constructor(private readonly sequelize: Sequelize) {}

  //Fetch all articles
  public async getAllArticles(params: any): Promise<Record<string, any>> {
    const page: number = params.page || 0;
    const from: number = page > 0 ? page * 9 : 0;
    const to: number = page > 0 ? from + 8 : 8;
    //sql query need to be executed
    console.log(to);
    const sql = `SELECT p1.id, p1.post_date,p1.post_title,p1.post_content,p1.post_name,p1.post_modified,wm2.meta_value, u.user_nicename, u.display_name, t.name as terms_name FROM wp_posts p1 LEFT JOIN wp_postmeta wm1 ON ( wm1.post_id = p1.id AND wm1.meta_value IS NOT NULL AND wm1.meta_key = '_thumbnail_id' ) LEFT JOIN wp_postmeta wm2 ON ( wm1.meta_value = wm2.post_id AND wm2.meta_key = '_wp_attached_file' AND wm2.meta_value IS NOT NULL ) LEFT JOIN wp_term_relationships rel ON rel.object_id = p1.ID LEFT JOIN wp_term_taxonomy tax ON ( tax.term_taxonomy_id = rel.term_taxonomy_id AND tax.taxonomy = 'category' ) LEFT JOIN wp_terms t ON (t.term_id = tax.term_id) LEFT JOIN wp_users u ON u.ID =  p1.post_author WHERE p1.post_status = 'publish' AND p1.post_type = 'post'  ORDER BY p1.post_date DESC LIMIT ${from}, ${to}`;
    //fetch and return the response
    return await this.sequelize.query(sql, { type: QueryTypes.SELECT });
  }
}

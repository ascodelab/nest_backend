/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';
import { HelperService } from 'src//common/providers';

@Injectable()
export class BlogService {
  //implement constructor
  constructor(
    private readonly sequelize: Sequelize,
    private readonly helper: HelperService,
  ) { }

  //Fetch all articles
  public async getAllArticles(params: any): Promise<Record<string, any>> {
    //code for pagination
    const page: number = params.page || 0;
    const recordsPerPage: number = parseInt(process.env.RECORDS_PER_PAGE);
    const offset: number = page > 0 ? (page - 1) * recordsPerPage : 0;
    console.log(offset)
    //code for filter by category/tag slug
    const type: string = (params.filter_type === undefined) ? 'category' : 'post_tag';
    //condition for filtering by category/subcategory/slug
    let filter: string = '';
    const slug: string = (params.filter_slug === undefined) ? '' : params.filter_slug;
    const name: string = (params.post_name === undefined) ? '' : params.post_name;
    //fetch sub categories if slug value provided
    filter = await this.filterByCategoryAndTag(slug, type, filter, name);
    //sql query need to be executed
    const sql = `SELECT  p1.id, p1.post_date,p1.post_title,p1.post_content,p1.post_name,p1.post_modified,wm2.meta_value, u.user_nicename, u.display_name,u.user_email, t.name as terms_name,(SELECT group_concat(wp_terms.name separator ', ') FROM wp_terms
    INNER JOIN wp_term_taxonomy on wp_terms.term_id = wp_term_taxonomy.term_id INNER JOIN wp_term_relationships wpr on wpr.term_taxonomy_id = wp_term_taxonomy.term_taxonomy_id WHERE taxonomy= 'category' and p1.id = wpr.object_id) AS "Categories",(SELECT group_concat(wp_terms.name separator ', ') FROM wp_terms INNER JOIN wp_term_taxonomy on wp_terms.term_id = wp_term_taxonomy.term_id INNER JOIN wp_term_relationships wpr on wpr.term_taxonomy_id = wp_term_taxonomy.term_taxonomy_id WHERE taxonomy= 'post_tag' and p1.id = wpr.object_id) AS "Tags" FROM wp_posts p1 LEFT JOIN wp_postmeta wm1 ON ( wm1.post_id = p1.id AND wm1.meta_value IS NOT NULL AND wm1.meta_key = '_thumbnail_id' ) LEFT JOIN wp_postmeta wm2 ON ( wm1.meta_value = wm2.post_id AND wm2.meta_key = '_wp_attached_file' AND wm2.meta_value IS NOT NULL ) LEFT JOIN wp_term_relationships rel ON rel.object_id = p1.ID LEFT JOIN wp_term_taxonomy tax ON ( tax.term_taxonomy_id = rel.term_taxonomy_id AND tax.taxonomy = '${type}' ) INNER JOIN wp_terms t ON (t.term_id = tax.term_id) LEFT JOIN wp_users u ON u.ID =  p1.post_author WHERE p1.post_status = 'publish' AND p1.post_type = 'post' ${filter}  group by  p1.id ORDER BY p1.post_date DESC LIMIT ${offset}, ${recordsPerPage}`;

    //fetch and return the response
    //return this.helper.formatArticleList(result);
    return this.sequelize.query(sql, { type: QueryTypes.SELECT });
  }

  private async filterByCategoryAndTag(slug: string, type: string, condition: string, name: string) {
    if (slug) {
      //query for fetching sub categories
      let q0 = `SELECT t.name,t.slug FROM wp_terms t left join wp_term_taxonomy tt using (term_id) where tt.taxonomy='${type}' and tt.parent IN (select term_id from wp_terms where slug = '${slug}')`;
      let subCategories = await this.sequelize.query(q0, { type: QueryTypes.SELECT, });
      let subCategorySlug: string[] = [];
      if (subCategories.length > 0) {
        subCategories.forEach(function (elm) {
          subCategorySlug.push("'" + elm['slug'] + "'");
        });
      }
      //pushing parrent category slug
      subCategorySlug.push("'" + slug + "'");
      condition = `AND (t.slug in (${subCategorySlug}))`;
    }
    if (name) {
      condition += `AND p1.post_name = '${name}'`;
    }
    return condition;
  }
}




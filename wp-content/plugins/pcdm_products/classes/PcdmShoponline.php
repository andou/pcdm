<?php

class PcdmShoponline {
  /**
   * Definisce il nome del tipo di dato che utilizziamo
   */

  const TYPE_IDENTIFIER = 'pcdm_shoponline';

  /**
   * Definisce il prefisso per i capi per questo tipo di dato
   */
  const TYPE_PREFIX = 'pcdm_shoponline_';

  protected $do_not_translate;

  public function __construct() {
    $this->do_not_translate = array(
        'description'
    );
    add_action('init', array(&$this, 'defineType'));
    add_filter('cmb_meta_boxes', array(&$this, 'defineFields'));
    add_filter('pll_copy_post_metas', array(&$this, 'avoidTranslation'));
    //aggiunta delle dimensioni delle varie immagini
    add_image_size('pcdm_shoponline_wall_image', 296, 296, FALSE);
  }

  /**
   * Per evitare la sincronizzazione di alcuni campi
   * 
   * @param type $metas
   * @return type
   */
  public function avoidTranslation($metas) {
    foreach ($this->do_not_translate as $key) {
      $key = array_search(self::TYPE_PREFIX . $key, $metas);
      if (!($key === FALSE)) {
        unset($metas[$key]);
      }
    }
    return $metas;
  }

  /**
   * Definisce il tipo di dato Prodotto da console di amministrazione         
   */
  public function defineType() {

    $labels = array(
        'name' => _x('ShopOnLine', 'post type general name'),
        'singular_name' => _x('ShopOnLine', 'post type singular name'),
        'add_new' => _x('Add New', 'home item'),
        'add_new_item' => __('Add Shop'),
        'edit_item' => __('Edit Shop Item'),
        'new_item' => __('New Shop Item'),
        'view_item' => __('View Shop Item'),
        'search_items' => __('Search Shop'),
        'not_found' => __('Nothing found'),
        'not_found_in_trash' => __('Nothing found in Trash'),
        'parent_item_colon' => ''
    );

    $args = array(
        'labels' => $labels,
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true,
        'query_var' => true,
        'rewrite' => false,
        'rewrite' => array(
            'slug' => 'shoponline',
            'with_front' => false
        ),
        'capability_type' => 'post',
        'hierarchical' => false, //non presenta gerarchia
        'menu_position' => null,
        'has_archive' => true,
        'supports' => array('title')
    );

    register_post_type(self::TYPE_IDENTIFIER, $args);
  }

  public function defineFields($meta_boxes) {

    $meta_boxes[] = array(
        'id' => self::TYPE_PREFIX . 'fieldset_1',
        'title' => 'Description',
        'pages' => array(self::TYPE_IDENTIFIER),
        'context' => 'normal',
        'priority' => 'low',
        'show_names' => TRUE,
        'fields' => array(
            array(
                'name' => 'Description',
                'desc' => 'Specify a description for this on line shop.',
                'id' => self::TYPE_PREFIX . 'description',
                'type' => 'textarea_small'
            ),
            array(
                'name' => 'Letter',
                'desc' => 'This will be used for wall grouping.',
                'id' => self::TYPE_PREFIX . 'letter',
                'type' => 'text_medium'
            ),
            array(
                'name' => 'Link',
                'desc' => 'Please, insert a link.',
                'id' => self::TYPE_PREFIX . 'link',
                'type' => 'text_medium'
            ),
            array(
                'name' => 'Text Link',
                'desc' => 'Please, insert a text for the link.',
                'id' => self::TYPE_PREFIX . 'textlink',
                'type' => 'text_medium'
            ),
        )
    );
    
    
    $meta_boxes[] = array(
        'id' => self::TYPE_PREFIX . 'fieldset_2',
        'title' => 'Images',
        'pages' => array(self::TYPE_IDENTIFIER),
        'context' => 'normal',
        'priority' => 'low',
        'show_names' => true,
        'fields' => array(
            array(
                'name' => 'Wall Image',
                'desc' => 'Upload an image',
                'id' => self::TYPE_PREFIX . 'wall_image',
                'type' => 'file',
                'save_id' => true, // save ID using true
                'allow' => array('attachment') 
            )
        ),
    );

    return $meta_boxes;
  }

}
import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksClass extends Struct.ComponentSchema {
  collectionName: 'components_blocks_classes';
  info: {
    displayName: '\u041A\u043B\u0430\u0441\u0441';
    icon: 'feather';
  };
  attributes: {
    Class_persons: Schema.Attribute.Component<'blocks.person', true>;
    Class_photo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    Literal: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 1;
      }>;
    vospominaniyas: Schema.Attribute.Relation<
      'oneToMany',
      'api::memory.memory'
    >;
  };
}

export interface BlocksContacts extends Struct.ComponentSchema {
  collectionName: 'components_blocks_contacts';
  info: {
    displayName: '\u041A\u043E\u043D\u0442\u0430\u043A\u0442';
    icon: 'rotate';
  };
  attributes: {
    Email: Schema.Attribute.Email;
    Logo: Schema.Attribute.Media<'images', true>;
    Phone: Schema.Attribute.String;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksEvent extends Struct.ComponentSchema {
  collectionName: 'components_blocks_events';
  info: {
    displayName: '\u0421\u043E\u0431\u044B\u0442\u0438\u0435 \u044D\u043F\u043E\u0445\u0438';
    icon: 'paperPlane';
  };
  attributes: {
    Caption: Schema.Attribute.Text;
    Content: Schema.Attribute.Text & Schema.Attribute.Required;
    Gallery: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required;
    Image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    Title: Schema.Attribute.String;
    Type: Schema.Attribute.Enumeration<
      ['Article', 'Photo', 'Gallery', 'Video']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Article'>;
    Video: Schema.Attribute.Media<'videos'> & Schema.Attribute.Required;
  };
}

export interface BlocksGift extends Struct.ComponentSchema {
  collectionName: 'components_blocks_gifts';
  info: {
    displayName: '\u041F\u043E\u0434\u0430\u0440\u043E\u043A';
    icon: 'magic';
  };
  attributes: {
    Name: Schema.Attribute.String & Schema.Attribute.Required;
    Photo: Schema.Attribute.Media<'images'>;
  };
}

export interface BlocksPartner extends Struct.ComponentSchema {
  collectionName: 'components_blocks_partners';
  info: {
    displayName: '\u041F\u0430\u0440\u0442\u043D\u0435\u0440';
    icon: 'alien';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    Logo: Schema.Attribute.Media<'images'>;
    Name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksPerson extends Struct.ComponentSchema {
  collectionName: 'components_blocks_people';
  info: {
    displayName: '\u0427\u0435\u043B\u043E\u0432\u0435\u043A';
    icon: 'user';
  };
  attributes: {
    Description: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'\u0412\u044B\u043F\u0443\u0441\u043A\u043D\u0438\u043A'>;
    Full_name: Schema.Attribute.String & Schema.Attribute.Required;
    Photo: Schema.Attribute.Media<'images'>;
  };
}

export interface BlocksSsylka extends Struct.ComponentSchema {
  collectionName: 'components_blocks_ssylka';
  info: {
    displayName: '\u0421\u0441\u044B\u043B\u043A\u0430';
    icon: 'link';
  };
  attributes: {
    Link: Schema.Attribute.String & Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface EndowmentBlocksDoc extends Struct.ComponentSchema {
  collectionName: 'components_endowment_blocks_docs';
  info: {
    displayName: '\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442';
    icon: 'briefcase';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface EndowmentBlocksDonor extends Struct.ComponentSchema {
  collectionName: 'components_endowment_blocks_donors';
  info: {
    displayName: '\u0414\u043E\u043D\u043E\u0440';
    icon: 'alien';
  };
  attributes: {
    amount: Schema.Attribute.Integer;
    date: Schema.Attribute.Date;
    name: Schema.Attribute.String;
  };
}

export interface EndowmentBlocksTeam extends Struct.ComponentSchema {
  collectionName: 'components_endowment_blocks_teams';
  info: {
    displayName: '\u041A\u043E\u043C\u0430\u043D\u0434\u0430';
    icon: 'manyToMany';
  };
  attributes: {
    bio: Schema.Attribute.Text;
    Name: Schema.Attribute.String & Schema.Attribute.Required;
    Photo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    Position: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.class': BlocksClass;
      'blocks.contacts': BlocksContacts;
      'blocks.event': BlocksEvent;
      'blocks.gift': BlocksGift;
      'blocks.partner': BlocksPartner;
      'blocks.person': BlocksPerson;
      'blocks.ssylka': BlocksSsylka;
      'endowment-blocks.doc': EndowmentBlocksDoc;
      'endowment-blocks.donor': EndowmentBlocksDonor;
      'endowment-blocks.team': EndowmentBlocksTeam;
    }
  }
}

import React from 'react'

import {InventoryControl} from '../src/widgets/InventoryControl.js'
import {SelectDB} from '../src/widgets/SelectDB.js'
import {SelectDBPreview} from '../src/widgets/SelectDBPreview.js'
import {SelectClass} from '../src/widgets/SelectClass.js'
import EncryptedString from '../src/widgets/EncryptedString.js'

import '../src/globalStyles.css'
import data from '../src/data.json'
import Home from '../src/views/Home'
import About from '../src/views/About'
import Contact from '../src/views/Contact'
import Blog from '../src/views/Blog'
import SinglePost from '../src/views/SinglePost'
import ProductPageTemplate from '../src/views/ProductPageTemplate'

console.log('React version', React.version)

const CMS = window.CMS
CMS.registerPreviewStyle(
  'https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.css'
)
CMS.registerPreviewStyle('/admin/cms.bundle.css')

const getDocument = (collection, name) =>
  data[collection] && data[collection].filter(page => page.name === name)[0]
const getDocuments = (collection, name) => data[collection]

const globalSettings = getDocument('settings', 'global')
const posts = getDocuments('posts')
const products = getDocuments('products')

// Preview Templates
CMS.registerPreviewTemplate('home-page', ({ entry }) => (
  <Home fields={entry.toJS().data} />
))
CMS.registerPreviewTemplate('about-page', ({ entry }) => (
  <About fields={entry.toJS().data} />
))
CMS.registerPreviewTemplate('contact-page', ({ entry }) => (
  <Contact fields={entry.toJS().data} siteTitle={globalSettings.siteTitle} />
))
CMS.registerPreviewTemplate('blog-page', ({ entry }) => (
  <Blog fields={entry.toJS().data} posts={posts} />
))
CMS.registerPreviewTemplate('posts', ({ entry }) => (
  <SinglePost fields={entry.toJS().data} />
))
CMS.registerPreviewTemplate('products', ({ entry }) => (
  <ProductPageTemplate fields={entry.toJS().data} />
))
CMS.registerPreviewTemplate('productStock', ({ entry }) => (
  <ProductPageTemplate fields={entry.toJS().data} />
))

CMS.registerWidget(
  'selectClassData',
  SelectClass(data)
)

CMS.registerWidget(
  'encryptedString',
  EncryptedString
)

CMS.registerWidget(
  'selectRegion',
  SelectDB(data,'regionsAndCarriers','regions'),
  SelectDBPreview
)

CMS.registerWidget(
  'selectCarrier',
  SelectDB(data,'regionsAndCarriers','carriers'),
  SelectDBPreview
)

CMS.registerWidget(
  'inventory',
  InventoryControl(data)
)


// Return to home when user logging out
window.netlifyIdentity.on('logout', function () {
  document.location.href = '/'
})

// Log netlifySiteURL if editing on localhost
if (
  window.location.hostname === 'localhost' &&
  window.localStorage.getItem('netlifySiteURL')
) {
  console.log(
    `%cnetlifySiteURL: ${window.localStorage.getItem('netlifySiteURL')}`,
    'color: hotpink; font-size: 15px'
  )
}

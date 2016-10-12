jQuery(document).ready(
  ()->
    readMore = jQuery(".read-more")
    detail = jQuery(".detail")
    sideBar = jQuery(".side-bar")

    showMore = () ->
      detail.show()
      sideBar.show()
      readMore.hide()

    readMore.on(
      "click",
      showMore
    )
)
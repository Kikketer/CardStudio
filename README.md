# Card Studio

My goal is to create a desktop application that helps me build, design, and generate printable sheets for card games.

## Immediate Goals

1. Allow building a template using the "layers" type system
2. Attach an external data format to it (json5 not CSV)
3. Generate the cards using the layers
4. Automatically save the cards
5. Generate PnP pages

There will be 2 files per deck.  One of which is the templates that defines the layers and items related to that deck.

The second file is the actual data for each card.

**Example Deck Definition**

```json5
{
  title: 'Deck A',
  layers: [
    {
      type: 'Text',
      text: '{{title}}',
      offsetX: 10,
      offsetY: 10,
      align: 'center',
      gravity: 'center'
    },
    {
      type: 'Image',
      url: '{{image}}',
      offsetX: '{{offsetX}}',
      offsetY: 10,
      align: 'center',
      gravity: 'center'
    }
  ]
}
```

**Example Data**

```json5
[
  {
    title: 'Some title',
    offsetX: 15,
    url: './some/local/dir/image.png'
  }
]
```

## Future Goals

1. Full project that contains many decks
2. Card types/sizes
3. Generate cards for The Game Crafter
4. Use The Game Crafter style API to plug in!
5. Many many many more things that I'll discover along the way

## Feature 1: Create PNP Sheets from Images

`Since Version 0.1.0`

Create PnP sheets from a directory of images. Right now it only accepts poker sized images and has zero flexibility (or real error handling). Look at the `/test/card-images` folder for an example directory that contains card images that I use.

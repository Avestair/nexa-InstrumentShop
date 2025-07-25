/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: API for managing products with variants
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Variant:
 *       type: object
 *       required:
 *         - colorName
 *         - colorCode
 *         - sku
 *         - stock
 *         - price
 *       properties:
 *         colorName:
 *           type: string
 *           description: The name of the color (e.g., "Black")
 *         colorCode:
 *           type: string
 *           description: The hex code of the color (e.g., "#000000")
 *         sku:
 *           type: string
 *           description: The unique Stock Keeping Unit for this variant
 *         stock:
 *           type: integer
 *           description: The available stock for this specific variant
 *         price:
 *           type: number
 *           description: The price for this specific variant
 *
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the product
 *         name:
 *           type: string
 *           description: The name of the product
 *         description:
 *           type: string
 *           description: The description of the product
 *         category:
 *           type: string
 *           description: The product category
 *         brand:
 *           type: string
 *           description: The product brand
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: URLs of the product's general images
 *         variants:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Variant'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *
 *   post:
 *     summary: Create a new product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - category
 *               - brand
 *               - variants
 *               - productImages
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               brand:
 *                 type: string
 *               variants:
 *                 type: string
 *                 description: A JSON string of the variants array.
 *                 example: '[{"colorName":"Black","colorCode":"#000000","sku":"GT-YMH-C40-BLK","stock":50,"price":5000000},{"colorName":"Natural","colorCode":"#DEB887","sku":"GT-YMH-C40-NAT","stock":35,"price":5200000}]'
 *               productImages:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of product images to upload.
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request (e.g., missing fields, invalid JSON)
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *
 *   put:
 *     summary: Update a product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               brand:
 *                 type: string
 *               variants:
 *                 type: string
 *                 description: (Optional) A JSON string of the complete, updated variants array.
 *                 example: '[{"colorName":"Black","colorCode":"#000000","sku":"GT-YMH-C40-BLK","stock":45,"price":5100000}]'
 *               imagesToDelete:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of image URLs to be deleted. e.g., ["/uploads/123.jpg"]
 *               productImages:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: (Optional) New images to be added.
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *
 *   delete:
 *     summary: Delete a product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product and associated images deleted successfully
 *       404:
 *         description: Product not found
 */


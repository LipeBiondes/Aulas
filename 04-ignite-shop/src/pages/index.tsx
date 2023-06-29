import { HomeContainer, Product } from '../styles/pages/home'

import { useKeenSlider } from 'keen-slider/react'

import Image from 'next/image'

import Head from 'next/head'

import 'keen-slider/keen-slider.min.css'
import { stripe } from '../lib/stripe'
import { GetStaticProps } from 'next'
import Stripe from 'stripe'

import Link from 'next/link'

import { client } from '../lib/client'
import { Region } from 'shieldbow'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
  }[]
  summonerData: {
    name: string
    level: number
    profileIcon: string
    region: Region
  }
}

export default function Home({ products, summonerData }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      {console.log(summonerData)}
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => {
          return (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              prefetch={false}
            >
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} alt="" width={520} height={480} />
                <footer>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </footer>
              </Product>
            </Link>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount / 100)
    }
  })

  const summonerData = await client
    .initialize({
      cache: true,
      storage: false,
      region: 'br',
      logger: {
        enable: true,
        level: 'WARN'
      },
      ratelimiter: {
        strategy: 'spread',
        throw: true,
        retry: {
          retries: 5,
          retryDelay: 5000
        }
      },
      fetch: {
        champions: false,
        items: false,
        runes: false,
        summonerSpells: false
      }
    })
    .then(async () => {
      const summoner = await client.summoners.fetchBySummonerName(
        'Alefe Biondes'
      )
      return summoner
    })

  return {
    props: {
      products,
      summonerData: {
        name: summonerData.name,
        level: summonerData.level,
        profileIcon: summonerData.profileIcon,
        region: summonerData.region
      }
    },
    revalidate: 60 * 60 * 2 // 2 hours
  }
}
